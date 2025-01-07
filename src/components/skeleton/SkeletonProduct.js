// @mui
import { Grid, Skeleton, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonProduct() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      </Grid>
      <Grid item xs={12} md={7}>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" height={80} width="100%" />
          <Skeleton variant="text" height={80} width="100%" />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" height={80} width="100%" />
          <Skeleton variant="text" height={80} width="100%" />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" height={80} width="100%" />
          <Skeleton variant="text" height={80} width="100%" />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" height={80} width="100%" />
          <Skeleton variant="text" height={80} width="100%" />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" height={80} width="100%" />
          <Skeleton variant="text" height={80} width="100%" />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" height={80} width="100%" />
          <Skeleton variant="text" height={80} width="100%" />
        </Stack>
      </Grid>
    </Grid>
  );
}
