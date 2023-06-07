# Frontend_BD2
Faça o download e a instalação do XAMPP: Acesse o site oficial do XAMPP (https://www.apachefriends.org) e faça o download da versão compatível com o seu sistema operacional. Siga as instruções de instalação para configurar o XAMPP corretamente.

Baixe e instale o PostgreSQL: Acesse o site oficial do PostgreSQL (https://www.postgresql.org) e faça o download da versão adequada para o seu sistema operacional. Siga as instruções de instalação para configurar o PostgreSQL corretamente.

Inicie os serviços do XAMPP: Após a instalação do XAMPP, inicie o painel de controle do XAMPP e inicie os serviços do Apache e do MySQL.

Configuração do PostgreSQL no PHP: Abra o arquivo de configuração do PHP chamado php.ini. No XAMPP, geralmente, esse arquivo está localizado em "C:\xampp\php\php.ini". Procure pela linha "extension=pgsql" e remova o ponto e vírgula (;) no início da linha para descomentá-la. Faça o mesmo para a linha "extension=pdo_pgsql".

Reinicie o servidor Apache: Após as alterações no arquivo php.ini, reinicie o servidor Apache no painel de controle do XAMPP para que as configurações sejam aplicadas.

Na pasta Htdocs adicione o Back e Front
O banco devera ter o nome lab_quimica
