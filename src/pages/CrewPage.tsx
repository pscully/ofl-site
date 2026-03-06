import { Users, Mic2, Wifi, Fish } from 'lucide-react';

export function CrewPage() {
  const crew = [
    {
      name: 'Mercer',
      role: 'The Talker',
      bio: 'Die-hard sports fan and fantasy football wizard. Mike brings the heat with NFL takes, fantasy insights, and the occasional hot take that gets the whole crew fired up.',
      icon: Mic2,
    },
    {
      name: 'Luckadoo',
      role: 'The Instigator',
      bio: 'Low handicap golfer and course connoisseur. Dave shares his love for the game with honest reviews, swing tips, and stories from some of the best courses around.',
      icon: Wifi,
    },
    {
      name: 'Dame',
      role: 'The Fantasy Guru',
      bio: 'Tournament angler and tackle junkie. Tom takes you on fishing adventures, shares the techniques that work, and tells the tales that make every trip worth it.',
      icon: Fish,
    },
    {
      name: 'Mcfadden',
      role: 'The Elder',
      bio: 'Tournament angler and tackle junkie. Tom takes you on fishing adventures, shares the techniques that work, and tells the tales that make every trip worth it.',
      icon: Fish,
    },
    {
      name: 'Scully',
      role: 'The Brains',
      bio: 'Tournament angler and tackle junkie. Tom takes you on fishing adventures, shares the techniques that work, and tells the tales that make every trip worth it.',
      icon: Fish,
    },
  ];

  return (
    <div>
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 brand-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold-600/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="w-20 h-20 text-brand-gold-500 mx-auto mb-6" />

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream-100 mb-6 text-shadow-glow">
              Meet the Crew
            </h1>

            <p className="text-xl md:text-2xl text-brand-cream-200 leading-relaxed">
              Longtime friends shootin' the shit.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-maroon-900/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {crew.map((member) => {
              const Icon = member.icon;
              return (
                <div
                  key={member.name}
                  className="brand-card rounded-2xl p-8 text-center hover:border-brand-gold-400/40 transition-all hover:-translate-y-2"
                >
                  <Icon className="w-16 h-16 text-brand-gold-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-serif font-bold text-brand-cream-100 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-brand-gold-500 font-medium mb-4">{member.role}</p>
                  <p className="text-brand-cream-300 leading-relaxed">{member.bio}</p>
                </div>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto brand-card rounded-2xl p-12">
            <h2 className="text-3xl font-serif font-bold text-brand-cream-100 mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-4 text-brand-cream-300 leading-relaxed">
              <p>
                What started as three old friends shooting the breeze over beers has turned into something
                bigger than we ever imagined. We're just three guys in our 40s who love sports, golf, fishing,
                and real conversations about life.
              </p>
              <p>
                Old Fart Livin' launched as our flagship podcast, where we dive into everything that matters
                to us—NFL debates, fantasy football strategies, navigating work and family, and keeping our
                sanity in a world that moves too fast. The response was incredible, and it showed us there's
                a whole community of folks who feel the same way.
              </p>
              <p>
                From there, we expanded into Old Fart Golfin' and Old Fart Fishin', bringing our authentic
                take on the sports and hobbies we're passionate about. No corporate polish, no fake hype—just
                honest content from people who genuinely love what they do.
              </p>
              <p>
                Whether you're tuning in for the podcast, watching our videos, or rocking our merch, we're
                grateful you're part of the Old Fart family. Here's to living life, playing golf, catching
                fish, and having a damn good time doing it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
