import { LandscapeApp, ui } from 'lumin';


const { UiText } = ui;

// Global variables init
const cars = {
  "honda": "civic",
  "toyota": "camry",
  "kia": "rio"
};
let data = "Press setData\n to begin testing";
let key, value;

function check<T>(val: T | null, message: string): T {
  if (val === null) throw new Error(message || "Unexpected null encountered")
  return val;
}

export class App extends LandscapeApp {
  onAppStart() {
    // Create a new prism that's half a meter cubed.
    let prism = check(this.requestNewPrism([0.5, 0.5, 0.5]));

    // Buttons init
    let setDataBtn = ui.UiButton.Create(prism, "setData");
    setDataBtn.onActivateSub(env =>{
      setLocalStorageData();
    })

    let getDataBtn = ui.UiButton.Create(prism, "getData");
    getDataBtn.onActivateSub(env => {
      getLocalStorageData();
    })

    let getLengthBtn = ui.UiButton.Create(prism, "getLength");
    getLengthBtn.onActivateSub(env => {
      getLocalStorageLength();
    })
    
    let getKeyBtn = ui.UiButton.Create(prism, "getKey");
    getKeyBtn.onActivateSub(env => {
      getLocalStorageDataByKey();
    })

    let removeItemBtn = ui.UiButton.Create(prism, "removeItem");
    removeItemBtn.onActivateSub(env => {
      removeItemFromLocalStorage();
    })

    let clearData = ui.UiButton.Create(prism, "clearData");
    clearData.onActivateSub(env => {
      clearLocalStorage();
    })

    // Setting layer for buttons to align them
    let btnLayer = ui.UiLinearLayout.Create(prism);
    btnLayer.setAlignment(ui.Alignment.CENTER_RIGHT);
    btnLayer.setOrientation(ui.Orientation.kVertical);
    btnLayer.setDefaultItemPadding([0.01, 0.01, 0.01, 0.01]);
    
    // Adding buttons onto layer
    btnLayer.addItem(setDataBtn);
    btnLayer.addItem(getDataBtn);
    btnLayer.addItem(getLengthBtn);
    btnLayer.addItem(getKeyBtn);
    btnLayer.addItem(removeItemBtn);
    btnLayer.addItem(clearData);

    // Text init
    let dataText = UiText.Create(prism, data);
    dataText.setTextSize(0.02);

    // Setting layer for text to align them
    let dataTextLayer = ui.UiLinearLayout.Create(prism);
    dataTextLayer.setAlignment(ui.Alignment.BOTTOM_LEFT);
    dataTextLayer.setOrientation(ui.Orientation.kVertical);
    dataTextLayer.setDefaultItemPadding([0, 0.05, 0.07, 0.02]);

    // Adding text onto layer
    dataTextLayer.addItem(dataText);

    // localStorage methods
    function getLocalStorageData() {
      if(localStorage.getItem("toyota") == null || localStorage.getItem("toyota") == undefined){
        dataText.setText("LocalStorage has no data");
      } else {
        dataText.setText("Key: toyota\nValue: " + localStorage.getItem("toyota"));
      }
    }

    function setLocalStorageData() {
      for ([key, value] of Object.entries(cars)) { 
        localStorage.setItem(key, value);
      }

      if(localStorage.getItem("toyota") != null || localStorage.getItem("toyota") != undefined){
        dataText.setText("Data is being set successfully.");
      } else {
        dataText.setText("Local storage has no data.");
      }
    }
    // Waiting for a fix
    function getLocalStorageLength() {
      dataText.setText("LocalStorage length:\n" + localStorage.length);
    }
    // Waiting for a fix
    function getLocalStorageDataByKey() {
    dataText.setText("Get item from localStorage by key: ", localStorage.key(1));
    } 

    function removeItemFromLocalStorage() {
      localStorage.removeItem("toyota");
      localStorage.getItem("toyota");
      if(localStorage.getItem("toyota") == null || localStorage.getItem("toyota") == undefined){
        dataText.setText("Item with key:toyota\nis being removed");
      }
    }

    function clearLocalStorage() {
      localStorage.clear();
      if(localStorage.getItem("toyota") == null &&
         localStorage.getItem("honda") == null &&
         localStorage.getItem("kia") == null){
        dataText.setText("LocalStorage is cleared");
      } else {
        dataText.setText("LocalStorage was not cleared.");
      }
    }

    // Adding UI items onto prism
    check(prism.getRootNode()).addChild(dataTextLayer);
    check(prism.getRootNode()).addChild(btnLayer);
  }

  // Known Issue
  // Web Inspector does not work unless the updateLoop function is present in source.
  // It can be removed for production code.
  updateLoop(delta: number) {
    return true;
  }

  init() {
    return 0;
  }
}
