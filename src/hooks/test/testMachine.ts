import reactInterpret from 'src/utils/reactInterpret';
import revoid from 'src/utils/revoid';
import { testmachine } from '~machines';

export const { useSelector, start, send, sender } =
  reactInterpret(testmachine);

export const onClick = revoid(sender('CLICK'));
