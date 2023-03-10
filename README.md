## 버스 출발 시간표 작성 서비스

### 노선 정보

```
http://apis.data.go.kr/6410000/busrouteservice/getBusRouteList?serviceKey={API_KEY}&keyword=6004
```

### 노선 실시간 위치 정보

```
http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList?serviceKey={API_KEY}&routeId={노선ID}
```

### 노선 경유 정류장 목록

```
http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList?serviceKey={API_KEY}&routeId={노선ID}
```

