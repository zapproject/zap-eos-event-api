import io from 'socket.io-client';

componentDidMount() {
  const endp = io.connect('http://localhost:3000/events/addendpoint');
  const endp2 = io.connect('http://localhost:3000/events/bond');
  endp.on('start', (resp: any) => console.log(resp.message));
  endp.on('data', (resp: any) => console.log(resp.data));
  endp2.on('start', (resp: any) => console.log(resp.message));
  endp2.on('data', (resp: any) => console.log(resp.data));
  fetch('http://localhost:3000/api/common/events/bond/all/?offset=0&limit=10')
  .then(raw => raw.json())
  .then(res => console.log(res));
}
