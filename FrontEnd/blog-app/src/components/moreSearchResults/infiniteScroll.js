export function initializeIntersectionObserver(callback,listOfNodes){
    const options = {
        root : null,
        rootMargin : '0px',
        threshold : 1
    }

    const observer = new IntersectionObserver(callback,options);
    listOfNodes.forEach(element => {
        observer.observe(element);
    });
    return observer;
}