import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),
};

export default function Terms() {
  const sections = [
    {
      id: "agreement",
      title: "1. Agreement to Terms",
      content:
        "By accessing and using Zinochain (hereinafter referred to as 'the Platform'), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      id: "use-license",
      title: "2. Use License",
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on Zinochain for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
- Modifying or copying the materials
- Using the materials for any commercial purpose or for any public display
- Attempting to decompile or reverse engineer any software contained on Zinochain
- Removing any copyright or other proprietary notations from the materials
- Transferring the materials to another person or "mirroring" the materials on any other server`,
    },
    {
      id: "disclaimer",
      title: "3. Disclaimer",
      content:
        "The materials on Zinochain are provided on an 'as is' basis. Zinochain makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    },
    {
      id: "limitations",
      title: "4. Limitations",
      content:
        "In no event shall Zinochain or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Zinochain, even if Zinochain or an authorized representative has been notified orally or in writing of the possibility of such damage.",
    },
    {
      id: "accuracy",
      title: "5. Accuracy of Materials",
      content:
        "The materials appearing on Zinochain could include technical, typographical, or photographic errors. Zinochain does not warrant that any of the materials on Zinochain are accurate, complete, or current. Zinochain may make changes to the materials contained on Zinochain at any time without notice.",
    },
    {
      id: "links",
      title: "6. Links",
      content:
        "Zinochain has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Zinochain of the site. Use of any such linked website is at the user's own risk.",
    },
    {
      id: "modifications",
      title: "7. Modifications",
      content:
        "Zinochain may revise these terms of service for Zinochain at any time without notice. By using Zinochain, you are agreeing to be bound by the then current version of these terms of service.",
    },
    {
      id: "governing-law",
      title: "8. Governing Law",
      content:
        "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Zinochain operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
    },
    {
      id: "contact",
      title: "9. Contact Information",
      content:
        "If you have any questions about these Terms and Conditions, please contact us at hi@zinochain.com. We are committed to resolving any concerns you may have regarding these terms or our service.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0}
            className="mb-12"
          >
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              data-testid="text-terms-title"
            >
              <span className="gradient-text">Terms & Conditions</span>
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-terms-intro">
              Please read these terms carefully before using Zinochain Bot. Your
              use of our platform constitutes your agreement to these terms.
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={index + 1}
              >
                <Card
                  className="p-6 bg-card/50 backdrop-blur-sm"
                  data-testid={`section-${section.id}`}
                >
                  <h2
                    className="text-xl font-bold mb-3 text-foreground"
                    data-testid={`heading-${section.id}`}
                  >
                    {section.title}
                  </h2>
                  <p
                    className="text-muted-foreground whitespace-pre-line leading-relaxed"
                    data-testid={`content-${section.id}`}
                  >
                    {section.content}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={sections.length + 1}
            className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50"
          >
            <p className="text-sm text-muted-foreground text-center">
              Last updated: November 2025. These terms are subject to change at
              any time. Please check back regularly for updates.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
