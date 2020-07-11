import escape from 'sql-template-strings';

import auth0 from '../../utils/auth0';
import { query } from '../../utils/db';

const initializeUser = async (req) => {
  const session = await auth0.getSession(req);

  if (session) {
    const user = await query(escape`
      SELECT _id
      FROM user
      WHERE email = ${session.user.email}
      LIMIT 1
    `)

    if (user.length < 1) {
      const { user: { email, given_name, family_name, }, createdAt } = session;

      // Create user
      const newUser = await query(escape`
        INSERT INTO user (email, first_name, last_name, created_at)
        VALUES (${email}, ${given_name}, ${family_name}, ${new Date(createdAt).toISOString()});
      `)

      // Create default account and category
      await Promise.all([
        query(escape`
          INSERT INTO account (name, user_id)
          VALUES ('Cash', ${newUser.insertId});
        `),
        query(escape`
          INSERT INTO category (name, user_id)
          VALUES ('Shopping', ${newUser.insertId});
        `)
      ]);
    }
  }
}

export default async function me(req, res) {
  try {
    await initializeUser(req);
    await auth0.handleProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
