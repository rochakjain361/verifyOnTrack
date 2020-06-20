import indigo from '@material-ui/core/colors/indigo';
import { createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
    palette: {
        primary: indigo
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