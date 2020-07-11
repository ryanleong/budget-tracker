import withAuthContext, { useAuthContext, NOT_AUTHENTICATED } from '../contexts/AuthContext';
import NewTransactionModal from '../components/NewTransactionModal'

const Dashboard = () => {
  const { state, dispatch } = useAuthContext();

  return (
    <div>
      Dashboard

      // TODO display overview data

      <hr />
      <h3>Create new transaction</h3>
      <NewTransactionModal />
    </div>
  )
};

export default withAuthContext(Dashboard);
