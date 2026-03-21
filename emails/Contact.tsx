import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";
import * as React from "react";

interface PortfolioContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  message,
}: PortfolioContactEmailProps) => {
  const main = {
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#374151',
    margin: '0',
    padding: '0',
  };

  const container = {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const header = {
    backgroundColor: '#1e40af',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    padding: '32px 24px',
    textAlign: 'center' as const,
  };

  const headerTitle = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    letterSpacing: '-0.025em',
  };

  const headerSubtitle = {
    color: '#e0e7ff',
    fontSize: '16px',
    margin: '0',
    fontWeight: '400',
  };

  const content = {
    padding: '40px 32px',
  };

  const greeting = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 24px 0',
  };

  const sectionTitle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '32px 0 16px 0',
    paddingBottom: '8px',
    borderBottom: '2px solid #e5e7eb',
  };

  const messageBox = {
    backgroundColor: '#f8fafc',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '20px',
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#374151',
    whiteSpace: 'pre-wrap' as const,
    marginTop: '20px',
    marginBottom: '20px',
  };

  const actionSection = {
    backgroundColor: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: '8px',
    padding: '16px',
    margin: '32px 0',
  };

  const actionText = {
    fontSize: '14px',
    color: '#92400e',
    margin: '0',
    fontWeight: '500',
  };

  const footer = {
    backgroundColor: '#f9fafb',
    padding: '24px 32px',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'center' as const,
  };

  const footerText = {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0',
  };

  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>
              New Contact Inquiry
            </Heading>
            <Text style={headerSubtitle}>
              Portfolio Contact Form
            </Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>
              Hello Hset Paing,
            </Text>

            <Text style={{ margin: '0 0 24px 0', color: '#4b5563' }}>
              You have received a new contact form submission. Please find the
              details below:
            </Text>

            {/* Contact Information */}
            <Heading style={sectionTitle}>
              Contact Information
            </Heading>
            <Section style={{ width: "100%" }}>
              <ContactItem label="Full Name" value={name} />
              <ContactItem label="Email Address" value={email} isEmail />
            </Section>

            {/* Message */}
            <Section style={{ margin: '32px 0' }}>
              <Heading style={sectionTitle}>
                Message Details
              </Heading>
              <Section style={messageBox}>
                {message}
              </Section>
            </Section>

            {/* Action Required */}
            <Section style={actionSection}>
              <Text style={actionText}>
                ⚡ Action Required: Please respond to this inquiry as soon as possible.
              </Text>
            </Section>

            {/* Submission Details */}
            <Section style={{ fontSize: '14px', color: '#6b7280', marginTop: '32px' }}>
              <Text style={{ margin: '0 0 4px 0' }}>
                <strong>Submitted:</strong> {timestamp}
              </Text>
              <Text style={{ margin: '0' }}>
                <strong>Source:</strong> Portfolio Website
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This email was automatically generated from the Portfolio website contact form.
            </Text>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Reusable info item component
const ContactItem = ({
  label,
  value,
  isEmail,
}: {
  label: string;
  value: string;
  isEmail?: boolean;
}) => {
  const infoItem = {
    width: "100%",
    padding: '16px',
    margin: "20px 0",
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
  };

  const infoLabel = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    margin: '0 0 4px 0',
  };

  const infoValue = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#111827',
    margin: '0',
    wordBreak: 'break-word' as const,
  };

  return (
    <Section style={infoItem}>
      <Text style={infoLabel}>{label}</Text>
      {isEmail ? (
        <Text style={infoValue}><a href={`mailto:${value}`} style={{ color: '#1e40af', textDecoration: 'underline' }}>{value}</a></Text>
      ) : (
        <Text style={infoValue}>{value}</Text>
      )}
    </Section>
  )
};

export default ContactEmail;
