import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

export async function GET() {
  try {
    // Test 1: Simple SELECT
    const result = await db.select().from(users).limit(1);

    return Response.json({
      success: true,
      message: 'Database connection successful',
      queriesRun: ['SELECT * FROM users LIMIT 1'],
      resultCount: result.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return Response.json(
      {
        success: false,
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
