browser.commands.onCommand.addListener(async (command) => {
    if (command === "open-tab-after-current") {
        await openNewTabAfterCurrent(); // This line calls your function to handle the operation
    }
});

async function openNewTabAfterCurrent() {
    await setAfterCurrent(); // Sets the new tab position to 'afterCurrent'
    await browser.tabs.create({}); // Opens a new tab

    // Resetting the newTabPosition to its original setting 'relatedAfterCurrent'
    try {
        let result = await browser.browserSettings.newTabPosition.set({
            value: "relatedAfterCurrent",
        });
        console.log(`Reset result: ${result}`);
    } catch (error) {
        console.error('Error resetting newTabPosition: ', error);
    }
}

async function setAfterCurrent() {
    try {
      // Attempt to change the newTabPosition setting to 'afterCurrent'
      let result = await browser.browserSettings.newTabPosition.set({
        value: "afterCurrent",
      });
  
      console.log(`Result: ${result}`); // Logs the result of the setting change
  
      // Optionally, check the new value of the setting
      let newValue = await browser.browserSettings.newTabPosition.get({});
      console.log(`New value: ${newValue.value}`); // Logs the new value of the setting
    } catch (error) {
      // Handle any errors that occur during the setting change
      console.error('Error setting newTabPosition: ', error);
    }
  }