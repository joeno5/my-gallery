import { createMuiTheme } from '@material-ui/core/styles';
import { purple, lightBlue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: purple,
  },
  status: {
    danger: 'orange',
  },
  overrides: {
    root: {
        display: "flex",
    },
  },
});

export default theme;