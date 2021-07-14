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

export function getPadding(oneElement,resultList,limit){
    let height = oneElement.offsetHeight;
    let padding = 0;
    if(resultList){
      if(resultList.length > limit){
        padding = (resultList.length - limit)*height;
      }
    }
    return padding;
  }