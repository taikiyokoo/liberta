// utils/actionCable.ts

import { Cable } from "actioncable";
import ActionCable from 'actioncable';

const cable: Cable = ActionCable.createConsumer('ws://localhost:3001/cable')

export default cable;
