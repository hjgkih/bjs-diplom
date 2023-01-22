const logout = new LogoutButton();

logout.action = () => {
  ApiConnector.logout((response) => {
    if (response.success === true) {
      location.reload();
    } 
  });
}

ApiConnector.current((response) => {
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);  
  }
});

const rates = new RatesBoard();

let valuteScore = ApiConnector.getStocks((response) => {
      if (response.success === true) {
        rates.clearTable();
        rates.fillTable(response.data);
      }
    });

setInterval(valuteScore, 600);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success === true) {
      moneyManager.setMessage(response.success, 'Пополнение счёта произведено успешно');
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
    }  
  });
}

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success === true) {
      moneyManager.setMessage(response.success, 'Конвертирование валюты произведено успешно');
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
    }  
  });
}

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success === true) {
      moneyManager.setMessage(response.success, 'Конвертирование валюты произведено успешно');
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
    }  
  });
}

const favorites = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success === true) {
    favorites.clearTable();
    favorites.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } 
});

favorites.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success === true) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favorites.setMessage(response.success, 'Пользователь добавлен в избранное');
    } else {
      favorites.setMessage(response.success, response.error);
    }
  });
}

favorites.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success === true) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favorites.setMessage(response.success, 'Пользователь удален из избранного');
    } else {
      favorites.setMessage(response.success, response.error);
    }
  });
}