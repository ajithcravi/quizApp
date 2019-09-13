let displayOne = document.getElementsByClassName("displayOne");
let displayTwo = document.getElementsByClassName("displayTwo");
let displayThree = document.getElementsByClassName("displayThree");

function switchDiv(flag){
  switch (flag) {
    case 2:
      displayOne[0].style.display = "none";
      displayTwo[0].style.display = "block";
      break;

    case 3:
      displayTwo[0].style.display = "none";
      displayThree[0].style.display = "block";
      break;
  }
}