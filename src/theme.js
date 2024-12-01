import { extendTheme } from '@chakra-ui/react';
import '@fontsource-variable/caveat';
import '@fontsource-variable/mansalva';

const theme = extendTheme({
    fonts:{
      heading: "'Caveat, bold'",
      body: "'Mansalva', regular'"
    },
});

export default theme;