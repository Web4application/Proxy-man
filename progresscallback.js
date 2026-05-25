/**
 * Simulates a long-running transform process with step-by-step progress tracking
 * @param {Array} items - The dataset to process
 * @param {Function} onProgress - Callback triggered on every status update
 * @returns {Promise<Array>} Resolves with the final transformed data
 */
function progressTransform(items, onProgress) {
  return new Promise((resolve, reject) => {
    const total = items.length;
    const transformedData = [];
    let processedCount = 0;

    // Process chunk sequentially to simulate an ongoing operation
    function processNext(index) {
      if (index >= total) {
        return resolve(transformedData);
      }

      try {
        // Core transformation work
        const currentItem = items[index];
        const result = { ...currentItem, transformed: true, timestamp: Date.now() };
        transformedData.push(result);

        processedCount++;

        // Trigger the progress callback with metadata
        if (typeof onProgress === 'function') {
          onProgress({
            loaded: processedCount,
            total: total,
            percentage: Math.round((processedCount / total) * 100)
          });
        }

        // Defer next item to prevent UI blocking
        setTimeout(() => processNext(index + 1), 50);
      } catch (error) {
        reject(error);
      }
    }

    // Begin processing loop
    processNext(0);
  });
}
