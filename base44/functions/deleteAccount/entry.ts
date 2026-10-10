import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await base44.entities.User.delete(user.id);

    return Response.json({ status: 'success' });
  } catch (error) {
    return Response.json({ error: error.message || 'Failed to delete account' }, { status: 500 });
  }
}