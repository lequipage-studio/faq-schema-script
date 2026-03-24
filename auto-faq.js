<script>
document.addEventListener("DOMContentLoaded", function() {
    const faqParents = document.querySelectorAll('[faq=parent]');
    const faqItems = [];

    faqParents.forEach(parent => {
        const children = parent.children;
        let faqSectionStarted = false;

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.tagName === 'H1' || child.tagName === 'H2' || child.tagName === 'H3' || child.tagName === 'H4' || child.tagName === 'H5' || child.tagName === 'H6') {
                const text = child.textContent.trim();
                if (text === 'FAQ' || text === 'Frequently Asked Questions') {
                    faqSectionStarted = true;
                }
                if (faqSectionStarted && text.endsWith('?')) {
                    const question = text;
                    const answerElement = children[i + 1];
                    if (answerElement && answerElement.tagName === 'P') {
                        const answer = answerElement.textContent.trim();
                        faqItems.push({
                            "@type": "Question",
                            "name": question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": answer
                            }
                        });
                    }
                }
            }
        }
        
        // Original functionality to handle [faq=question] and [faq=answer] attributes
        const questions = parent.querySelectorAll('[faq=question]');
        const answers = parent.querySelectorAll('[faq=answer]');
        for (let i = 0; i < questions.length; i++) {
            faqItems.push({
                "@type": "Question",
                "name": questions[i].textContent.trim(),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answers[i].textContent.trim()
                }
            });
        }
    });

    if (faqItems.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(script);
    }
});
</script>
