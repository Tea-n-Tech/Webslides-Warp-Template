function connectDivs(leftQuery, rightQuery)
{

  const svgId = "tnt-slide-svg"

  var source = $(leftQuery);
  var targets = $("section.current").find(rightQuery);

  let parent = $("section.current");
  let svg = parent.find("#" + svgId);
  if (svg.length !== 0)
    svg = $(svg[0]);

  // create container div
  const svg_div = d3.select(parent[0]).append("div");

  // create container svg
  if (svg.length === 0 && targets.length !== 0)
    svg = d3.select(parent[0]).append("svg");
  svg.attr("style",
           "position: absolute; top: 0; left: 0; width: 100%; height: 100vh; ");
  svg.attr("id", svgId);
  svg.attr("preserveAspectRatio", "xMinYMin meet");

  // connect left to right
  for (let iItem = 0; iItem < targets.length; iItem++) {

    let target = $(targets[iItem]);

    let x1 = source.offset().left + source.width();
    let y1 = source.offset().top + (source.height() / 2);
    let x2 = target.offset().left;
    let y2 = target.offset().top + (target.height() / 2);

    // create line
    let lineData =
      [
        { x : x1 + (x2 - x1) * 0.1, y : y1 },
        { x : x1 + (x2 - x1) * 0.35, y : y1 + (y2 - y1) * 0.2 },
        { x : x1 + (x2 - x1) * 0.65, y : y1 + (y2 - y1) * 0.8 },
        {
          x : x2, // - (x2 - x1) * 0.01,
          y : y2
        },
      ]

      var lineFunction = d3.line()
                           .x(function(d) { return d.x; })
                           .y(function(d) { return d.y; })
                           .curve(d3.curveCardinal);

    let curveString = "M " + lineData[0].x + " " + lineData[0].y + " C " +
                      lineData[1].x + " " + lineData[1].y + " " +
                      lineData[2].x + " " + lineData[2].y + " " +
                      lineData[3].x + " " + lineData[3].y;

    svg.append("path")
      .attr("class", "path-left-right")
      .attr("d", lineFunction(lineData));

    svg.append("path")
      .attr("class", "path-left-right-motion")
      .attr("d", lineFunction(lineData));
  }

  // append svg to parent
  // if (targets.length !== 0)
  //   parent.append(svg)
}

// load an iframe
function loadIFrame(button, iframePath, width, height)
{

  let ifrDiv = button.parentNode;

  // let ifrDiv = document.getElementById(parentId);
  let ifr = document.createElement("iframe");
  ifr.loading = "lazy";
  ifr.width = width;
  ifr.height = height;
  ifr.src = iframePath;

  Array.prototype.forEach.call(ifrDiv.children,
                               elem => elem.style.display = 'none');
  // ifrDiv.childNodes.forEach(elem => elem.style.visibility = 'hidden!');
  ifrDiv.appendChild(ifr);
}