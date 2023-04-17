import * as React from 'react';
import { List, Paper, ListItemIcon, ListItemText, Checkbox, ListItem, Grid, Button } from '@mui/material';

interface TransferListItem {
  id: string;
  title: string;
}

function not(a: TransferListItem[], b: TransferListItem[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: TransferListItem[], b: TransferListItem[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({
  setChecked,
  setLeft,
  setRight,
  checked,
  left,
  right,
}: {
  setChecked: React.Dispatch<React.SetStateAction<TransferListItem[]>>;
  setLeft: React.Dispatch<React.SetStateAction<TransferListItem[]>>;
  setRight: React.Dispatch<React.SetStateAction<TransferListItem[]>>;
  checked: TransferListItem[];
  left: TransferListItem[];
  right: TransferListItem[];
}) {
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: TransferListItem) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items: TransferListItem[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.title}-label`;

          return (
            <ListItem key={value.title} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.title}`} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ display: 'flex', flexDirection: { xs: 'column', xl: 'row' } }}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" sx={{ rotate: { xs: '90deg', xl: '0deg' } }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
