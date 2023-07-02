import React from 'react';
import { Link, useParams } from 'react-router-dom';
import API from 'utils/apiConfig';
import { Typography, Box, Button } from '@mui/material';
import { User } from 'utils/models';
import { useDispatch } from 'react-redux';
import { setAlertOpen, setMessage } from 'store/uiSlice';
import ConfirmActionModal from 'components/ConfirmActionModal';
import FormInput from 'components/FormInput';

interface ApplicationResponse {
  id: string;
  diyexperience: string;
  user: User;
  sampleArticle: string;
  writingexperience: string;
  motivation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reason: string;
}

const AuthorApplication = () => {
  const [application, setApplication] = React.useState<ApplicationResponse | null>(null);
  const [statusColor, setStatusColor] = React.useState('black');
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalContent, setModalContent] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState<'approve' | 'reject' | ''>('');
  const [reason, setReason] = React.useState('');

  const { id } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getApplication = async () => {
      const res = await API.get(`/applications/author/${id}`);
      setApplication(res.data.data);
      if (res.data.data.status === 'pending') {
        setStatusColor('darkorange');
      } else if (res.data.data.status === 'approved') {
        setStatusColor('green');
      } else {
        setStatusColor('red');
      }
    };
    getApplication();
  }, [id]);

  const handleApprove = async () => {
    const res = await API.put(`/applications/author/${id}`, { status: 'approved', reason });
    if (res.data.success) {
      setStatusColor('green');
      if (application) {
        setApplication({ ...application, status: 'approved' });
      }
      dispatch(setMessage({ message: 'Application Approved', severity: 'success', code: 200 }));
      dispatch(setAlertOpen(true));
    }
  };

  const handleReject = async () => {
    const res = await API.put(`/applications/author/${id}`, { status: 'rejected', reason });
    if (res.data.success) {
      setStatusColor('red');
      if (application) {
        setApplication({ ...application, status: 'rejected' });
      }
      dispatch(setMessage({ message: 'Application Rejected', type: 'success', code: 200 }));
      dispatch(setAlertOpen(true));
    }
  };

  if (!application) return null;
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4">{application.user.fullName}&apos;s Application</Typography>
      <Box sx={{ display: 'flex', gap: 5, justifyContent: 'start', flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h6">
            Status:{' '}
            <Box sx={{ color: statusColor }} component={'span'}>
              {application.status}
            </Box>
          </Typography>
          {application.reason && <Typography variant="h6">Reason: {application.reason}</Typography>}
          <Typography variant="h6">Submitted: {new Date(application.createdAt).toLocaleDateString()}</Typography>
          <Typography variant="h6">Last Updated: {new Date(application.updatedAt).toLocaleDateString()}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Email: {application.user.email}</Typography>
          <Typography variant="h6">Country: {application.user.country}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 5,
          gap: 5,
          justifyContent: 'start',
          alignItems: 'start',
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography variant="h6">Motivation</Typography>
          {application?.motivation}
        </Box>
        <Box>
          <Typography variant="h6">Writing Experience</Typography>
          {application?.writingexperience}
        </Box>
        <Box>
          <Typography variant="h6">DIY Experience</Typography>
          {application?.diyexperience}
        </Box>
      </Box>
      {application.status !== 'rejected' && (
        <Link to={`/library/articles/c/x/items/x/item/${application.sampleArticle}`} target="_blank">
          <Button sx={{ mt: 5, color: 'blue' }} fullWidth>
            View Applicants Article
          </Button>
        </Link>
      )}
      {application.status === 'pending' && (
        <>
          <Typography variant="h6" sx={{ mt: 5 }}>
            Descision Reason (min 10 characters) *
          </Typography>
          <FormInput label="Reason" setState={setReason} title="Reason" name="reason" fieldIdx={0} type="text" />
          <Button
            onClick={() => {
              setModalTitle('Reject Application');
              setModalContent(
                'Are you sure you want to reject this application? Actions are irreversible, the article will be deleted from the library permanently.'
              );
              setModalAction('reject');
              setModalOpen(true);
            }}
            sx={{ mt: 5, color: 'red' }}
            disabled={reason.length < 10}
          >
            Reject Application
          </Button>
          <Button
            onClick={() => {
              setModalTitle('Approve Application');
              setModalContent(
                'Are you sure you want to approve this application? Actions are irreversible, the article will be published to the library.'
              );
              setModalAction('approve');
              setModalOpen(true);
            }}
            sx={{ mt: 5, color: 'green' }}
            disabled={reason.length < 10}
          >
            Approve Application
          </Button>
          <ConfirmActionModal
            title={modalTitle}
            content={modalContent}
            acceptAction={modalAction === 'approve' ? handleApprove : handleReject}
            acceptBtnText={'Yes i am sure'}
            rejectBtnText="No, take me back"
            open={modalOpen}
            setOpen={setModalOpen}
          />
        </>
      )}
    </Box>
  );
};

export default AuthorApplication;
