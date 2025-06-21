import React from 'react';
import useOnlineStatus from './useOnlineStatus';
import 'bootstrap/dist/css/bootstrap.min.css';

function StatusBanner() {
  const isOnline = useOnlineStatus();

  return (
    <div className={`alert ${isOnline ? 'alert-success' : 'alert-danger'} text-center`}>
      {isOnline ? '✅ You are connected to internet' : '❌ You do not have connection to internet'}
    </div>
  );
}

export default StatusBanner;