AmCharts.makeChart("chartdiv",
        {
          "type": "serial",
          "categoryField": "column-1",
          "autoMarginOffset": 0,
          "marginBottom": 0,
          "marginLeft": 0,
          "marginRight": 0,
          "marginTop": 0,
          "startDuration": 1,
          "startEffect": "easeOutSine",
          "backgroundColor": "#EAE7D9",
          "theme": "default",
          "categoryAxis": {
            "gridPosition": "start"
          },
          "trendLines": [],
          "graphs": [
            {
              "colorField": "color",
              "fillAlphas": 1,
              "id": "AmGraph-1",
              "lineColorField": "color",
              "title": "graph 1",
              "type": "column",
              "valueField": "column-1"
            }
          ],
          "guides": [],
          "valueAxes": [
            {
              "id": "ValueAxis-1",
              "title": ""
            }
          ],
          "allLabels": [],
          "balloon": {},
          "legend": {
            "enabled": false,
            "markerBorderAlpha": 0,
            "rollOverGraphAlpha": 0
          },
          "titles": [
            {
              "id": "Title-1",
              "size": 15,
              "text": ""
            }
          ],
          "dataProvider": [
            {
              "category": "category 1",
              "column-1": "8"
            },
            {
              "category": "category 2",
              "column-1": "16",
              "color": "#111"
            },
            {
              "category": "category 8",
              "color": "#fff",
              "column-1": "2"
            }
          ]
        }
      );