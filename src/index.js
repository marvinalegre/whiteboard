export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case '/posts':
        switch (request.method) {
          case 'GET':
            const { results: posts } = await env.DB.prepare('select content, created_at from posts order by created_at desc').all();

            return Response.json(posts);

          case 'POST': {
            const body = await request.json();

            await env.DB.prepare('insert into posts (content) values (?)').bind(body.content).run();

            return Response.json({ success: true }, { status: 201 });
          }

          default:
            return new Response('Method Not Allowed', {
              status: 405,
            });
        }

      default:
        return new Response('Not Found', { status: 404 });
    }
  },

  async scheduled(event, env, ctx) {
    await env.DB.prepare(
      `
    DELETE FROM posts
    WHERE datetime(created_at) < datetime('now', '-1 day')
  `,
    ).run();
  },
};
