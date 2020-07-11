import mysql from 'serverless-mysql';
import escape from 'sql-template-strings';

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
});

export const query = async query => {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
};

export const getUser = async (email) => {
  try {
    const user = await query(escape`
      SELECT _id FROM user
      WHERE email = ${email}
      LIMIT 1
    `);

    return user.length === 1 ? user[0] : null;
  } catch (error) {
    console.error(error)
    return null;
  }
};

export const getAccount = async (accountId, userId) => {
  try {
    const account = await query(escape`
      SELECT _id
      FROM account
      WHERE user_id = ${userId} AND _id = ${accountId}
    `);

    return account.length === 1 ? account[0] : null;
  } catch (error) {
    console.error(error)
    return null;
  }
};

export const getCategory = async (categoryId, userId) => {
  try {
    const category = await query(escape`
      SELECT _id
      FROM category
      WHERE user_id = ${userId} AND _id = ${categoryId}
    `);
    return category.length === 1 ? category[0] : null;
  } catch(error) {
    console.error(error)
    return null;
  }
};

export const createTransaction = async (userId, values) => {
  const { name, description, amount, account, category } = values;

  try {
    const newTransaction = await query(escape`
      INSERT INTO transaction (user_id, name, description, amount, account_id, category_id)
      VALUES (${userId}, ${name}, ${description || ''}, ${amount}, ${account}, ${category});
    `);

    return newTransaction;
  } catch(error) {
    console.error(error)
    return error;
  }
}

