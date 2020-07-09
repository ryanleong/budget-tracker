// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import auth0 from '../../utils/auth0';

// EXAMPLE of AUTH route
export default auth0.requireAuthentication(async (req, res) => {
  const { user } = await auth0.getSession(req);

  res.statusCode = 200
  res.json({ name: 'John Doe' })
});

