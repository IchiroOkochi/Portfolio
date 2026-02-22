'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function ContactForm() {
  const [status, setStatus] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('Sending...');
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      })
    });

    if (response.ok) setStatus('Message sent. Thanks for reaching out!');
    else setStatus('Could not send message. Please email directly.');
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card/70 p-6">
      <Input name="name" placeholder="Your name" required />
      <Input name="email" type="email" placeholder="Your email" required />
      <Textarea name="message" placeholder="How can we collaborate?" required />
      <Button type="submit" className="bg-white text-black hover:bg-white/90">
        Send Message
      </Button>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </form>
  );
}
