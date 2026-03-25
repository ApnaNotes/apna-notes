'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FAQs() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'What is ApnaNotes Senior Connect?',
      answer:
        'ApnaNotes Senior Connect helps students book 1:1 sessions with verified seniors for exam strategy, resources, and doubt solving in a practical, affordable format.',
    },
    {
      id: 'item-2',
      question: 'Do new users get any free trial?',
      answer:
        'Yes. Every new user gets the first 5 minutes absolutely free in their first session so they can evaluate mentor fit before spending balance.',
    },
    {
      id: 'item-3',
      question: 'What are the recharge plans?',
      answer:
        'Recharge options are simple: Rs 50 gives 15 minutes, Rs 100 gives 35 minutes, and Rs 200 gives 80 minutes.',
    },
    {
      id: 'item-4',
      question: 'Will I see a timer during the session?',
      answer:
        'Yes. A live timer is visible throughout your session so you can track remaining time and manage your discussion effectively.',
    },
    {
      id: 'item-5',
      question: 'What happens when my balance runs out?',
      answer:
        'Your session auto-pauses as soon as balance ends, and you will immediately get a recharge prompt to continue without losing context.',
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="text-foreground text-4xl font-semibold">FAQs</h2>
            <p className="text-muted-foreground mt-4 text-balance text-lg">
              Everything you need to know about ApnaNotes recharge and sessions
            </p>
            <p className="text-muted-foreground mt-6 hidden md:block">
              Can&apos;t find what you&apos;re looking for? Reach out to our{' '}
              <Link href="#contact" className="text-primary font-medium hover:underline">
                ApnaNotes support team
              </Link>{' '}
              for assistance.
            </p>
          </div>

          <div className="md:col-span-3">
            <Accordion type="single" collapsible>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-gray-200 dark:border-gray-600"
                >
                  <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="text-muted-foreground mt-6 md:hidden">
            Can&apos;t find what you&apos;re looking for? Contact our{' '}
            <Link href="#contact" className="text-primary font-medium hover:underline">
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export const BlurredStagger = ({
  text = 'built by ruixen.com',
}: {
  text: string
}) => {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  }

  const wordAnimation = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
    },
    show: {
      opacity: 1,
      filter: 'blur(0px)',
    },
  }

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="text-base leading-relaxed break-words whitespace-normal"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordAnimation}
            transition={{ duration: 0.3 }}
            className="inline-block whitespace-nowrap"
            style={{ marginRight: index < words.length - 1 ? '0.25em' : 0 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </div>
  )
}
