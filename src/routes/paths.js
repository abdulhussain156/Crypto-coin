// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/coins';

export const PATH_DASHBOARD = {
  root: '/',

  coins: {
    view: (name) => path(ROOTS_DASHBOARD, `/${name}`),
  },
};
