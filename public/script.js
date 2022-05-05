/**
 * #IpanaloNa10Ito
 * 
 * 
 * 
 */
!function(window, document) {
  const supporters = [
    'SUPPORTERS',
    'VOLUNTEERS',
    'UHAW SA GOOD GOVERNANCE'
  ]

  const $tayo = document.getElementById('tayo');
  const $save = document.getElementById('save');
  const $canvas = document.getElementById('kuwadro');
  const $ikaw = document.getElementById('ikaw');
  const $resizer = document.getElementById('resizer');

  const text_canvas = document.createElement('canvas');
  const tctx = text_canvas.getContext('2d');

  const ctx = $canvas.getContext('2d');
  const frame_img = new Image();
  const mask = new Image();
  const your_pic = new Image();


  frame_img.crossOrigin='Anonymous';
  mask.crossOrigin='Anonymous';
  your_pic.crossOrigin='Anonymous';

  let mouse_drag = {
    down: false,
    x: 0,
    y: 0,
    px:0,
    py:0
  }

  text_canvas.width = 1000;
  text_canvas.height = 1000;

  $tayo.addEventListener('click', (e) => {
      if(supporters.indexOf($tayo.value)) {
        $tayo.value = randomize();
      }
      else {
        $tayo.value = '';
      }
    });
  $tayo.addEventListener('blur', (e) => {
      
      if($tayo.value === '') {
        $tayo.value = randomize()
      }
    });

  const randomize = () => supporters[Math.floor(Math.random()*supporters.length)];

  $tayo.value = randomize();


  const resize = () => {
    let wh = window.innerHeight*0.7;
    let ww = window.innerWidth*0.7;

      if(wh<ww) {
        $canvas.style.width = wh+'px';
        $canvas.style.height = wh+'px';
        text_canvas.style.width = wh+'px';
        text_canvas.style.height = wh+'px';
      }
      else {
        $canvas.style.width = wh+'px';
        $canvas.style.height = wh+'px';
        text_canvas.style.width = wh+'px';
        text_canvas.style.height = wh+'px';
      }
  }
  window.addEventListener('resize', resize);

  resize();

  const preloadImg = () => {
    
    frame_img.src='public/frame.png';
    mask.src='public/upperleft.png';
    frame_img.addEventListener('load', e => {
      ctx.drawImage(frame_img, 0, 0, 1000, 1000);
    });
  }

  preloadImg();
  const downEvent =  (e) => {
    mouse_drag.down = true;
    mouse_drag.px = (e.pageX - $canvas.offsetLeft);
    mouse_drag.py = (e.pageY - $canvas.offsetTop);
  };

  const moveEvent = (e) => {
      
    if(mouse_drag.down) {
      mouse_drag.x += ((e.pageX - $canvas.offsetLeft)-mouse_drag.px)/30;
      mouse_drag.y += ((e.pageY - $canvas.offsetTop)-mouse_drag.py)/30;
    }
  };

  const upEvent =  (e) => {
    mouse_drag.down = false;
  };
  your_pic.addEventListener('load', (e) => {
    $canvas.style.cursor = 'move';
    mouse_drag.down = false;
    mouse_drag.x = 0;
    mouse_drag.y = 0;

    $resizer.style.display = 'inline-block';
    $resizer.value = 100;
    $resizer.addEventListener('change', (e) => {
    })
    $canvas.addEventListener('mousedown', downEvent)
    $canvas.addEventListener('mouseup', upEvent)
    $canvas.addEventListener('mousemove', moveEvent)
    $canvas.addEventListener('touchstart', downEvent)
    $canvas.addEventListener('touchend', upEvent)
    $canvas.addEventListener('touchmove', moveEvent)
  })
  $ikaw.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        your_pic.src = URL.createObjectURL(e.target.files[0]);
    }

  })


  const draw = () => {
    

      ctx.clearRect(0,0,$canvas.width,$canvas.height);
      const scale = $resizer.value/100;
      ctx.drawImage(your_pic, (mouse_drag.x-(your_pic.width*scale)/2),(mouse_drag.y-(your_pic.height*scale)/2), your_pic.width*scale, your_pic.height*scale);
      ctx.drawImage(frame_img, 0, 0, 1000, 1000);

      drawText();


      requestAnimationFrame(draw);

  }

  const drawText = () => {
    tctx.clearRect(0,0,text_canvas.width,text_canvas.height);
    tctx.setTransform (0.99, -0.10, -0.19, 1.03, 0, 0);
    tctx.font = '70px Montserrat';
    tctx.shadowColor='#941357';
    tctx.shadowBlur=30;
    tctx.fillStyle='white';
    tctx.fillText('LENI-KIKO', 500, 900);
    tctx.textAlign = 'center';

    

    let vals = $tayo.value.split('\n');
    for(x=0;x<vals.length;x++) {
      if(x==vals.length-1) {
        tctx.font = '50px Montserrat';
      } else {
        tctx.font = '35px Montserrat';
      }

      tctx.shadowColor='#941357';
      tctx.shadowBlur=20;
      tctx.fillStyle='white';
      tctx.textAlign = 'center';
      tctx.fillText(vals[x],690, 800-(((vals.length-1)*40)-x*40)-(x==vals.length-2?5:0));
    }


    tctx.shadowBlur=20;
    tctx.shadowColor='#941357';
    tctx.font = '35px Montserrat';
    tctx.fillText('FOR',690, 836);
    tctx.textAlign = 'center';

    ctx.drawImage(text_canvas, 0, 0);
    tctx.shadowBlur=20;
    tctx.shadowColor='#941357';
    tctx.font = '30px Montserrat';
    tctx.textAlign = 'left';
    tctx.save();
    for(n=0;n<4;n++) {
      tctx.fillStyle=`rgba(255,255,255,${n*0.3+0.12})`;
      tctx.fillText($tayo.value,12+n*7, 20+n*30);
    }
    
    for(n=0;n<3;n++) {
      tctx.fillStyle=`rgba(255,255,255,${1-(n+3)*0.12})`;
      tctx.fillText($tayo.value,38+n*7, 20+(n+4)*30);
    }
    tctx.setTransform (1, 0, 0, 1, 0, 0);

    tctx.globalCompositeOperation = 'destination-in';

    tctx.shadowColor='none';
    tctx.drawImage(mask,0,0,490,264)
    
    tctx.setTransform (0.99, -0.10, -0.19, 1.03, 0, 0);
    tctx.globalCompositeOperation = 'source-over';

    tctx.restore();
    ctx.drawImage(text_canvas, 0, 0);
  }

  requestAnimationFrame(draw);

  $save.addEventListener('click', function(e) {
    let dataurl = $canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');;

    downloadImage(dataurl, 'ipanalona10to.png');
  });

  function downloadImage(data, filename) {
    let a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }
}(window,document);