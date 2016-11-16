import cookie from 'react-cookie';
import _ from 'lodash';

export function getHeaders(options={}) {
  const headers = _.merge(
              {
                'access-token': cookie.load('access-token'),
                'expiry': cookie.load('cookie'),
                'token-type': cookie.load('token-type'),
                'uid': cookie.load('uid'),
                'client': cookie.load('client')
              }, options
            )
  return (
    headers
  )
}

export function setHeaders(headers) {
  cookie.save('access-token', (headers.get("access-token")));
  cookie.save('expiry', headers.get("expiry"));
  cookie.save('token-type', headers.get("token-type"));
  cookie.save('uid', headers.get('uid'));
  cookie.save('client', headers.get('client'));
}

export function removeHeaders(){
  cookie.remove('access-token');
  cookie.remove('expiry');
  cookie.remove('token-type');
  cookie.remove('uid');
  cookie.remove('client');
}
