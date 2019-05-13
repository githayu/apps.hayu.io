(function() {
  var canvas = document.getElementById('canvas');
  if (!canvas || !canvas.getContext) return false;
  var ctx = canvas.getContext('2d'),
      max_width = 300,
      max_height = 300;

  function handleFileSelect(evt) {
    var files = evt.target.files,
        output = [];

    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) continue;

      var reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          var img = new Image();
              img.src = e.target.result;

              img.onload = function() {
                var width = img.width,
                    height = img.height,
                    aspect = width / height;

                if (width > max_width) {
                  width = max_width;
                  height = width / aspect;
                }

                if(height > max_height) {
                  height = max_height;
                  width = height * aspect;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                $('#tabel-container').width(width).height(height);
                $('#convert').empty();

                var imageData = ctx.getImageData(0, 0, width, height),
                    imageDataIndex = 0,
                    last = {};

                for(var y = 0; y < height; y++) {
                  var tr = $('<tr>'),
                      num = 0;

                  for(var x = 0; x < width; x++) {
                    if(typeof last.x !== 'undefined' &&
                       last.y === y &&
                       last.r === imageData.data[imageDataIndex] &&
                       last.g === imageData.data[imageDataIndex+1] &&
                       last.b === imageData.data[imageDataIndex+2]) {
                      imageDataIndex += 4;
                    } else {
                      if(typeof last.x !== 'undefined') {
                        if(last.y === y && (x - last.x) > 1) {
                          tr.find('td').eq(last.n).attr({
                            colspan: (x - last.x)
                          });
                        } else {
                          $('#convert').find('tr').eq(last.y).find('td').eq(last.n).attr({
                            colspan: (width - last.x)
                          })
                        }
                      }

                      last = {
                        x: x,
                        y: y,
                        n: num++,
                        r: imageData.data[imageDataIndex++],
                        g: imageData.data[imageDataIndex++],
                        b: imageData.data[imageDataIndex++],
                        a: imageData.data[imageDataIndex++]
                      };

                      tr.append($('<td>').css({
                        background: 'rgb( '+ last.r +', '+ last.g +', '+ last.b +')',
                        width: 1,
                        height: 1,
                        padding: 0,
                        border: 'none'
                      }));
                    }
                  }

                  $('#convert').append(tr);
                }

                $('#result-container').removeClass('hidden');
                $('#convert-html').val('<table>'+ $('#convert').html() +'</table>');
              }
        };
      })(f);

      reader.readAsDataURL(f);
    }
  }

  $('#html-export').click(function() {
    var blob = new Blob([$('#convert-html').val()], {
      type: 'text/plain'
    });

    window.open(URL.createObjectURL(blob));
  });

  document.getElementById('image-file').addEventListener('change', handleFileSelect, false);
})();
