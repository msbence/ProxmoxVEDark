const swapLogo = async function() {
	const imgElements = document.getElementsByTagName('img');
	var found = false;
	for (var i = 0; i< imgElements.length; i++) {
		var node = imgElements[i]
		if (node.src.includes('proxmox_logo.png')) {
			found = true;
			var width = (node.parentElement.clientWidth == undefined || node.parentElement.clientWidth == 0) ? 172 : node.parentElement.clientWidth;
			var height = (node.parentElement.clientHeight == undefined || node.parentElement.clientHeight == 0) ? 30 : node.parentElement.clientHeight;
			node.parentElement.parentElement.style.background = '#333333';
			node.setAttribute('height', `${height}px`);
			node.setAttribute('width', `${width}px`);
			node.setAttribute('src', '/pve2/images/dd_logo.png');
		}
	}
	if (!found) {
		await new Promise(resolve => setTimeout(resolve, 60));
		await swapLogo();
	};
};

const patchCharts = function() {
	Ext.chart.theme.Base.prototype.config.chart.defaults.background = '#333333';
	Ext.chart.theme.Base.prototype.config.axis.defaults.label.color = 'white';
	Ext.chart.theme.Base.prototype.config.axis.defaults.title.color = 'white';
	Ext.chart.theme.Base.prototype.config.axis.defaults.style.strokeStyle = '#C78E32'; // WAS: #7289DA
	Ext.chart.theme.Base.prototype.config.axis.defaults.grid.strokeStyle = '#333333'; // WAS: #2C2F33
	Ext.chart.theme.Base.prototype.config.sprites.text.color = 'white';
};

function patchGaugeWidget() {
	Proxmox.panel.GaugeWidget.prototype.backgroundColor = '#333333';
	Proxmox.panel.GaugeWidget.prototype.criticalColor = '#f04747';
	Proxmox.panel.GaugeWidget.prototype.warningColor = '#facd1a';
	Proxmox.panel.GaugeWidget.prototype.defaultColor = '#C78E32';
	Proxmox.panel.GaugeWidget.prototype.items[1].series[0].colors[0] = '#333333';
};

function patchBackupConfig() {
	PVE.window.BackupConfig.prototype.items.style['background-color'] = '#333333';
};

function patchDiskSmartWindow() {
	const target = PVE.DiskSmartWindow || Proxmox.window.DiskSmart;
	target.prototype.items[1].style['background-color'] = '#333333';
}

function patchTFAEdit() {
	PVE.window.TFAEdit.prototype.items[0].items[0].items[1].style["background-color"] = 'transparent';
}

function patchCreateWidget() {
	_createWidget = Ext.createWidget
	Ext.createWidget = function(c, p) {
		if (typeof p === 'object' && typeof p.style === 'object') {
			if (c === 'component' && typeof p.style['background-color'] === 'string' && p.style['background-color'] === 'white') p.style['background-color'] = '#333333'
		}
		return _createWidget(c, p)
	}
}

swapLogo();
patchCharts();
patchGaugeWidget();
patchBackupConfig();
patchDiskSmartWindow();
patchTFAEdit();
patchCreateWidget();
console.log('PVEDiscordDark :: Patched');
