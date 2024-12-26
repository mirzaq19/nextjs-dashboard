import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
	const data = await client.sql`
    SELECT next_dashboard_invoices.amount, next_dashboard_customers.name
    FROM next_dashboard_invoices
    JOIN next_dashboard_customers ON next_dashboard_invoices.customer_id = next_dashboard_customers.id
    WHERE next_dashboard_invoices.amount = 666;
  `;

	return data.rows;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
