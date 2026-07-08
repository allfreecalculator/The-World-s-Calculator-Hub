import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, MapPin, Clock, Send, CheckCircle2, Home } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 animate-fade-in" id="contact-page">
      {/* Back button */}
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-mint dark:text-zinc-400 dark:hover:text-mint transition-colors cursor-pointer"
        id="btn-contact-back"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Calculators
      </button>

      {/* Hero Header */}
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase font-bold tracking-widest text-mint bg-mint/10 dark:bg-mint/5 px-3 py-1 rounded-full mb-4 inline-block">
          Get in Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-dark dark:text-white mt-2 mb-4">
          Contact <span className="text-mint">CalcHub</span> Support
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
          Have a calculator suggestion, found a bug, or want to collaborate with us? Drop us a line and we will reply as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        {/* Contact Info Sidebar - 5 cols */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-6 rounded-2xl shadow-xs">
            <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-4">
              Direct Contact Channels
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-mint/10 text-mint shrink-0 h-10 w-10 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Email Support</h4>
                  <a href="mailto:support@calchub.net" className="text-sm font-semibold text-slate-dark dark:text-white hover:text-mint transition-colors break-all">
                    support@calchub.net
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-mint/10 text-mint shrink-0 h-10 w-10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Feature Requests</h4>
                  <p className="text-sm font-medium text-slate-dark dark:text-zinc-300">
                    Submit via our contact form for priority assessment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-mint/10 text-mint shrink-0 h-10 w-10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Headquarters</h4>
                  <p className="text-sm font-medium text-slate-dark dark:text-zinc-300">
                    CalcHub Utility Network LLC<br />San Francisco, California
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-850 p-6 rounded-2xl">
            <h4 className="text-sm font-bold text-slate-dark dark:text-white mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-mint" />
              Response Standards
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We aim to review and reply to all legitimate feature requests and bug reports within <strong>24 to 48 hours</strong>. Please check your spam folder if you do not receive a prompt reply.
            </p>
          </div>
        </div>

        {/* Contact Form - 7 cols */}
        <div className="md:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-6 md:p-8 rounded-2xl shadow-xs">
          {isSubmitted ? (
            <div className="text-center py-12 animate-fade-in" id="contact-success">
              <div className="inline-flex p-3 rounded-full bg-mint/10 text-mint mb-4">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-slate-dark dark:text-white mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
                Thank you for reaching out. A copy of your submission has been forwarded to our helpdesk. We will get back to you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
              <h3 className="text-lg font-black text-slate-dark dark:text-white mb-4">
                Send us an Instant Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-slate-dark dark:text-white px-3.5 py-2 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-slate-dark dark:text-white px-3.5 py-2 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Calculator request, Bug report, Partnership..."
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-slate-dark dark:text-white px-3.5 py-2 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us what you'd like to calculate or submit..."
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-slate-dark dark:text-white px-3.5 py-2 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-hidden resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-2.5 bg-mint hover:bg-mint/90 text-slate-dark font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] cursor-pointer"
                id="btn-contact-submit"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-slate-dark" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Submission...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Dynamic CTA at bottom going Home */}
      <div className="bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-900/70 dark:to-zinc-900/30 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl text-center shadow-xs">
        <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-2 flex items-center justify-center gap-2">
          <Home className="w-5 h-5 text-mint" />
          Ready to Calculate?
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto">
          Explore over 500+ free online calculators and fast converters carefully built with absolute accuracy.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl bg-mint hover:bg-mint/90 text-slate-dark font-extrabold text-sm transition-all hover:scale-[1.02] cursor-pointer"
          id="btn-bottom-home-cta"
        >
          Return to Home Directory
        </button>
      </div>
    </div>
  );
}
