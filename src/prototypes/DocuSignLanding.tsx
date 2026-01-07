import React from 'react';
import {
  Card,
  Heading,
  Text,
  Button,
  Icon,
  Badge,
  Link,
  Stack,
  Grid,
  Inline,
  Container,
  List,
  ComboButton,
} from '@/design-system';
import styles from './DocuSignLanding.module.css';

/**
 * DocuSignLanding Prototype
 *
 * A landing page experience for the DocuSign app platform.
 *
 * Components used:
 * - Card (Layer 3) - Containers for sections (using Card.Body for padding)
 * - Heading, Text (Layer 3) - Typography
 * - Button, ComboButton (Layer 3/4) - Actions
 * - Icon (Layer 3) - Visual indicators
 * - Badge (Layer 3) - Status labels
 * - Link (Layer 3) - Hyperlinks
 * - List (Layer 4) - Activity and stats lists
 * - Stack, Grid, Inline, Container (Layer 2) - Layout utilities
 */

// Mock data for agreement activity
const agreementActivity = [
  {
    id: '1',
    title: 'Complete with Docusign: Umami Document (2).pdf',
    timestamp: '5 months ago',
    status: 'Voided',
  },
  {
    id: '2',
    title: 'Complete with Docusign: Umami Document.pdf',
    timestamp: '5 months ago',
    status: 'Voided',
  },
  {
    id: '3',
    title: 'One-time use login link from Identity Portal',
    timestamp: '6 months ago',
    status: 'Voided',
  },
];

// Overview stats data
const overviewStats = [
  { label: 'Open requests', count: 0 },
  { label: 'Waiting for others', count: 0 },
  { label: 'Expiring soon', count: 0 },
  { label: 'Completed', count: 0 },
  { label: 'Upcoming renewals', count: 0 },
];

interface DocuSignLandingProps {
  userName?: string;
}

export function DocuSignLanding({ userName = 'Akshat Mishra' }: DocuSignLandingProps) {
  return (
    <div className={styles.page}>
      {/* Hero Section - Full Bleed */}
      <div className={styles.heroSection}>
        <Stack gap="medium" align="center">
          <Heading level={2} className={styles.heroTitle}>
            Welcome back, {userName}
          </Heading>
          <Inline gap="small" wrap>
            <ComboButton variant="secondary" size="medium" inverted>
              Start
            </ComboButton>
            <Button kind="secondary" size="medium" inverted>
              <Icon name="document-plus" size="small" />
              Create a Request
            </Button>
            <Button kind="secondary" size="medium" inverted>
              <Icon name="send" size="small" />
              Send an Envelope
            </Button>
            <Button kind="secondary" size="medium" inverted>
              <Icon name="sign" size="small" />
              Sign a Document
            </Button>
          </Inline>
        </Stack>
      </div>

      <Container size="xlarge" className={styles.contentArea}>
        <Stack gap="large">
          {/* Main Content Grid */}
          <div className={styles.mainGrid}>
            {/* Left Column - Tasks and Activity */}
            <Stack gap="medium">
              {/* Tasks Card */}
              <Card radius="medium">
                <Card.Body className={styles.cardBody}>
                  <Stack gap="medium">
                    <Inline justify="between" align="center" className={styles.heading}>
                      <Heading level={4}>Tasks</Heading>
                      <Icon name="chevron-right" size="small" />
                    </Inline>
                    <div className={styles.emptyState}>
                      <Heading level={5} className={styles.emptyStateTitle}>
                        You don't have any tasks yet
                      </Heading>
                      <Text variant="body" color="secondary">
                        When you have new tasks assigned to you, they will show up here.
                      </Text>
                    </div>
                  </Stack>
                </Card.Body>
              </Card>

              {/* Agreement Activity Card */}
              <Card radius="medium">
                <Card.Body className={styles.cardBody}>
                  <Stack gap="small">
                    <Inline gap="small" align="center" className={styles.heading}>
                      <Heading level={4}>Agreement activity</Heading>
                      <Icon name="info" size="small" className={styles.infoIcon} />
                    </Inline>
                    <List variant="divided" hoverable>
                      {agreementActivity.map((item) => (
                        <List.Item
                          key={item.id}
                          description={item.timestamp}
                          meta={
                            <Inline gap="small" align="center">
                              <Badge variant="neutral" size="small">
                                <Inline gap="xs" align="center">
                                  <Icon name="close" size="small" />
                                  {item.status}
                                </Inline>
                              </Badge>
                            </Inline>
                          }
                          endElement={<Icon name="chevron-right" size="small" />}
                          clickable
                          onClick={() => console.log('Clicked:', item.title)}
                        >
                          <Text variant="body" weight="medium">
                            {item.title}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  </Stack>
                </Card.Body>
              </Card>
            </Stack>

            {/* Right Column - Overview */}
            <Card radius="medium" className={styles.overviewCard}>
              <Card.Body className={styles.cardBody}>
                <Stack gap="small">
                  <Heading level={4} className={styles.heading}>
                    Overview
                  </Heading>
                  <List variant="default">
                    {overviewStats.map((stat) => (
                      <List.Item
                        key={stat.label}
                        meta={
                          <Text variant="body" weight="medium">
                            {stat.count}
                          </Text>
                        }
                      >
                        <Text variant="body" color="secondary">
                          {stat.label}
                        </Text>
                      </List.Item>
                    ))}
                  </List>
                </Stack>
              </Card.Body>
            </Card>
          </div>

          {/* Promo Cards */}
          <Grid columns={2} gap="medium">
            {/* Bulk Send Promo */}
            <Card radius="medium" className={styles.promoCard}>
              <Card.Body className={styles.cardBody}>
                <Inline gap="medium" align="start">
                  <div className={styles.promoIcon}>
                    <Icon name="document-stack" size="large" />
                  </div>
                  <Stack gap="small">
                    <Heading level={5} className={styles.heading}>
                      Save time with bulk send
                    </Heading>
                    <Text variant="body" color="secondary">
                      No need to send separate envelopes. Import a bulk list and each recipient
                      receives a unique copy.
                    </Text>
                    <Link href="#" variant="primary">
                      Learn More
                    </Link>
                  </Stack>
                </Inline>
              </Card.Body>
            </Card>

            {/* Help Promo */}
            <Card radius="medium" className={styles.promoCard}>
              <Card.Body className={styles.cardBody}>
                <Inline gap="medium" align="start">
                  <div className={styles.promoIcon}>
                    <Icon name="help" size="large" />
                  </div>
                  <Stack gap="small">
                    <Heading level={5} className={styles.heading}>
                      Need help getting started?
                    </Heading>
                    <Text variant="body" color="secondary">
                      Get help with basic questions.
                    </Text>
                    <Link href="#" variant="primary">
                      View Our Guide
                    </Link>
                  </Stack>
                </Inline>
              </Card.Body>
            </Card>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}

export default DocuSignLanding;
