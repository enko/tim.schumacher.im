(async () => {
    const selector = [
        'article .description h1',
        'article .description h2',
        'article .description h3',
        'article .description h4',
        'article .description h5',
        'article .description h6',
    ].join(',');

    const nodes = document.querySelectorAll(selector);

    for (const node of nodes) {
        node.classList.add('ui');
        node.classList.add('dividing');
        node.classList.add('header');
    }
})();
