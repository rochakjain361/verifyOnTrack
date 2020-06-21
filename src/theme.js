import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
    typography: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        button: {
            textTransform: 'none',
            fontSize: 12
        }
    }
});

export default theme;