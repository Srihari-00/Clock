  // Selecting the clock hands
  const secondHand = document.querySelector('.second-hand');
  const minsHand = document.querySelector('.min-hand');
  const hourHand = document.querySelector('.hour-hand');

  function setDate() {
    const now = new Date();
    
    // Convert to IST (UTC+5:30)
    const utcOffset = now.getTimezoneOffset() * 60000; // Local timezone offset in milliseconds
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istTime = new Date(now.getTime() + utcOffset + istOffset);

    // Log the IST time for debugging
    console.log('IST Time:', istTime.toLocaleTimeString());

    // Calculating seconds and its corresponding degrees
    const seconds = istTime.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90; // Adding 90 to offset the initial position
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    // Calculating minutes and its corresponding degrees
    const mins = istTime.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90; // Including seconds for smooth transition
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    // Calculating hours and its corresponding degrees
    const hours = istTime.getHours();
    const hoursDegrees = ((hours % 12) / 12) * 360 + ((mins / 60) * 30) + 90; // Using modulo 12 for 12-hour format
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    // Handling the transition glitch when the second hand completes a full rotation
    if (secondsDegrees === 90) {
      secondHand.style.transition = 'none';
    } else {
      secondHand.style.transition = 'all 0.05s';
    }
  }

  // Set the clock hands every second
  setInterval(setDate, 1000);

  // Initial call to set the positions immediately upon page load
  setDate();

