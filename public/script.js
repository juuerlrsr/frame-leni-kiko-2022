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
  const $posx = document.getElementById('posx');
  const $posy = document.getElementById('posy');
  const $arrows = document.getElementById('arrows');

  const text_canvas = document.createElement('canvas');
  const tctx = text_canvas.getContext('2d');

  const ctx = $canvas.getContext('2d');
  const frame_img = new Image();
  const mask = new Image();
  const your_pic = new Image();

  frame_img.crossOrigin='Anonymous';
  mask.crossOrigin='Anonymous';
  your_pic.crossOrigin='Anonymous';

  const hasTouchEvents = 'ontouchstart' in window;
  const hasPointerEvents = window.PointerEvent;
  const hasTouch = hasTouchEvents
      || window.DocumentTouch && document instanceof DocumentTouch
      || navigator.maxTouchPoints; // IE >=11

  const pointerDown = !hasTouch ? 'mousedown' : `mousedown ${hasTouchEvents ? 'touchstart' : 'pointerdown'}`;
  const pointerMove = !hasTouch ? 'mousemove' : `mousemove ${hasTouchEvents ? 'touchmove' : 'pointermove'}`;
  const pointerUp = !hasTouch ? 'mouseup' : `mouseup ${hasTouchEvents ? 'touchend' : 'pointerup'}`;
  const pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter';
  const pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave';


  let offset = {
    x: 0,
    y: 0
  };
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
    let wh = window.innerHeight;
    let ww = window.innerWidth;

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

  your_pic.addEventListener('load', (e) => {

    $resizer.style.display = 'inline-block';
    $posx.style.display = 'inline-block';
    $posy.style.display = 'inline-block';
    $arrows.style.display = 'block';

    $resizer.value = 100;
    $posx.value = 0;
    $posy.value = 0;
    $resizer.addEventListener('change', (e) => {
    })
  })
  $ikaw.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        your_pic.src = URL.createObjectURL(e.target.files[0]);
    }

  })


  const draw = () => {
    

      ctx.clearRect(0,0,$canvas.width,$canvas.height);
      const scale = $resizer.value/100;
      const posx = $posx.value/100;
      const posy = $posy.value/100;
      ctx.drawImage(your_pic, posx*(your_pic.width*scale)+($canvas.width/2-(your_pic.width*scale)/2),posy*(your_pic.height*scale)+($canvas.height/2-(your_pic.height*scale)/2), your_pic.width*scale, your_pic.height*scale);
      ctx.drawImage(frame_img, 0, 0, 1000, 1000);

      drawText();


      requestAnimationFrame(draw);

  }

  
  $moves = $arrows.getElementsByClassName('move');
  let move = 'none';
  for(m=0;m<$moves.length;m++) {
    $moves[m].addEventListener(pointerDown, (e) => {

      move = e.target.id;
    })

    $moves[m].addEventListener(pointerUp, (e) => {

      move ='none';
    })

  }
  const drawText = () => {

    switch(move) {
      case 'up':
        offset.y-=2;
      break;
      case 'down':
        offset.y+=2;
      break;
      case 'left':
        offset.x-=2;
      break;
      case 'right':
        offset.x+=2;
      break;
    }
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

  window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||             
    window.msRequestAnimationFrame;

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