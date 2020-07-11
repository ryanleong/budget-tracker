import withAuthContext, { useAuthContext, NOT_AUTHENTICATED } from '../contexts/AuthContext'

const Dashboard = () => {
  const { state, dispatch } = useAuthContext();

  return (
    <div>
      Dashboard

      // TODO display overview data
    </div>
  )
};

export default withAuthContext(Dashboard);
