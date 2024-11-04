import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || '',
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

export async function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query(query);
    return result.recordset;
  } catch (err) {
    console.error('Query execution failed:', err);
    throw err;
  }
}