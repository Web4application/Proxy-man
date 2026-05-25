const rawData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));

// Use the function and catch live updates via the callback argument
progressTransform(rawData, (progress) => {
  console.log(`Processing... ${progress.percentage}% completed (${progress.loaded}/${progress.total})`);
})
.then(finalOutput => {
  console.log("Transformation fully complete!", finalOutput);
})
.catch(err => {
  console.error("An error occurred during transformation:", err);
});
