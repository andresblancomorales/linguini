import SessionActions from '../../actions/sessionActions';
import GusteauClient from '../../clients/gusteauClient';

const gusteauClient = new GusteauClient(GUSTEAU_URL);

export const sessionActions = new SessionActions(gusteauClient);