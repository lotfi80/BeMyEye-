import { styled, css } from '@adminjs/design-system/styled-components';
import { Box } from '@adminjs/design-system';

function App() {

return (
<>
      <Box variant="grey">
      <Button><Icon icon="Add" />Click Me</Button>
      <Button variant='primary' ml="xl">I am important</Button>
      </Box>
</>
);
}
export default App;