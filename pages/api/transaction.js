import escape from 'sql-template-strings';

import auth0 from '../../utils/auth0';
import { query, getUser, getAccount, getCategory, createTransaction } from '../../utils/db';

const transactionPOST = async (req, res, session) => {
  const values = req.body;

  // Verify user
  const user = await getUser(session.user.email);

  if (user) {
    const id = user._id;

    // verify account id and category id
    const [account, category] = await Promise.all([
      getAccount(values.account, id),
      getCategory(values.category, id),
    ]);

    if (account && category) {
      // Create transaction
      const newTransaction = await createTransaction(id, values);
      res.status(200).send({ status: 'success', transaction_id: newTransaction.insertId });
    } else {
      throw new Error('Account and/or category does not exist');
    }
  } else {
    throw new Error('User does not exist.')
  }
}

export default async function transaction(req, res) {
  try {
    const session = await auth0.getSession(req);

    // Create new transaction
    if (req.method === 'POST') {
      await transactionPOST(req, res, session);
    }

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).end({
      status: error.status || 500,
      message: error.message
    });
  }
}
