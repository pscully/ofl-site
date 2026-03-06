import { useState } from 'react';
import { Mail, MessageSquare, Briefcase } from 'lucide-react';
import scorecardImage from '../assets/scorecard.jpg';
import { Button } from '../components/Button';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <section className="relative py-44 md:py-52 overflow-hidden">
        <img
          src={scorecardImage}
          alt="Golf scorecard"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-brand-maroon-950/75"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold-600/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Mail className="w-20 h-20 text-brand-gold-500 mx-auto mb-6" />

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream-100 mb-6 text-shadow-glow">
              Get in Touch
            </h1>

            <p className="text-xl md:text-2xl text-brand-cream-200 leading-relaxed">
              Have a question, sponsorship inquiry, or just want to say hi? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-maroon-900/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="brand-card rounded-xl p-6 text-center">
              <MessageSquare className="w-12 h-12 text-brand-gold-500 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-brand-cream-100 mb-2">
                General Inquiries
              </h3>
              <p className="text-brand-cream-300 text-sm">
                Questions about the show or just want to chat? Drop us a line.
              </p>
            </div>

            <div className="brand-card rounded-xl p-6 text-center">
              <Briefcase className="w-12 h-12 text-brand-gold-500 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-brand-cream-100 mb-2">
                Sponsorships
              </h3>
              <p className="text-brand-cream-300 text-sm">
                Interested in partnering with us? Let's talk opportunities.
              </p>
            </div>

            <div className="brand-card rounded-xl p-6 text-center">
              <Mail className="w-12 h-12 text-brand-gold-500 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-brand-cream-100 mb-2">
                Guest Appearances
              </h3>
              <p className="text-brand-cream-300 text-sm">
                Think you'd be a great guest? We're always looking for interesting people.
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="brand-card rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-brand-cream-200 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-brand-maroon-800 border border-brand-cream-400/20 rounded-lg text-brand-cream-100 placeholder-brand-cream-400 focus:outline-none focus:border-brand-gold-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-brand-cream-200 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-brand-maroon-800 border border-brand-cream-400/20 rounded-lg text-brand-cream-100 placeholder-brand-cream-400 focus:outline-none focus:border-brand-gold-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-brand-cream-200 font-medium mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    aria-label="Select a subject"
                    className="w-full px-4 py-3 bg-brand-maroon-800 border border-brand-cream-400/20 rounded-lg text-brand-cream-100 focus:outline-none focus:border-brand-gold-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="guest">Guest Appearance</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-brand-cream-200 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-brand-maroon-800 border border-brand-cream-400/20 rounded-lg text-brand-cream-100 placeholder-brand-cream-400 focus:outline-none focus:border-brand-gold-500 transition-colors resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>

                {status === 'success' && (
                  <p className="text-center text-brand-gold-400">
                    Thanks for reaching out! We'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-center text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
